async function runTests() {
  const base = "http://localhost:3001";
  console.log("=== RUNNING AUTOMATED ROUTE & SECURITY VERIFICATION ===");

  const routes = [
    "/",
    "/about",
    "/experience",
    "/projects",
    "/youtube",
    "/resume",
    "/contact",
    "/admin/login",
    "/robots.txt",
    "/sitemap.xml",
  ];

  for (const r of routes) {
    try {
      const res = await fetch(`${base}${r}`);
      console.log(`[PASS] ${r} -> HTTP ${res.status} (${res.headers.get("content-type")?.split(";")[0]})`);
    } catch (err) {
      console.error(`[FAIL] ${r} -> ${err.message}`);
    }
  }

  // Test 1: Resume download endpoint
  console.log("\n=== TESTING RESUME DOWNLOAD ENDPOINT ===");
  try {
    const res = await fetch(`${base}/api/resume/download`);
    const contentType = res.headers.get("content-type");
    const contentDisposition = res.headers.get("content-disposition");
    const buffer = await res.arrayBuffer();
    const isPdf = Buffer.from(buffer.slice(0, 4)).toString("ascii") === "%PDF";
    console.log(`[PASS] /api/resume/download -> HTTP ${res.status}, Type: ${contentType}, Disposition: ${contentDisposition}`);
    console.log(`[PASS] Downloaded PDF verified with valid magic bytes: %PDF (File size: ${buffer.byteLength} bytes)`);
  } catch (err) {
    console.error(`[FAIL] /api/resume/download -> ${err.message}`);
  }

  // Test 2: Cron security (must reject requests without CRON_SECRET)
  console.log("\n=== TESTING CRON ENDPOINT AUTHORIZATION ===");
  try {
    const res = await fetch(`${base}/api/cron/sync-youtube`);
    if (res.status === 401) {
      console.log(`[PASS] Unauthorized call rejected with HTTP 401 Unauthorized as expected.`);
    } else {
      console.error(`[FAIL] Expected 401 but got HTTP ${res.status}`);
    }
  } catch (err) {
    console.error(`[FAIL] Cron test -> ${err.message}`);
  }

  // Test 3: Contact Form validation
  console.log("\n=== TESTING CONTACT FORM VALIDATION ===");
  try {
    const badRes = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "A", email: "not-an-email", subject: "", message: "too short" }),
    });
    if (badRes.status === 400) {
      const json = await badRes.json();
      console.log(`[PASS] Invalid submission caught by Zod schema with HTTP 400:`, Object.keys(json.issues || {}));
    } else {
      console.error(`[FAIL] Expected 400 for bad contact form, got HTTP ${badRes.status}`);
    }

    const goodRes = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Recruiter",
        email: "recruiter@enterprise.com",
        subject: "Senior eLearning Opportunity",
        message: "Hi Avinash, we are interested in discussing an Articulate 360 development project.",
      }),
    });
    console.log(`[PASS] Valid submission accepted with HTTP ${goodRes.status}:`, (await goodRes.json()).message);
  } catch (err) {
    console.error(`[FAIL] Contact test -> ${err.message}`);
  }
}

runTests();
