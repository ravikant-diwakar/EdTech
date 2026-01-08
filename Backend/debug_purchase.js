// Native fetch is available in Node 18+

// Polyfill for Node < 18 if needed, though 'npm run dev' suggests modern env.
// We'll rely on global fetch or try-catch.

const BASE_URL = 'http://localhost:4001';

async function runDebug() {
    console.log("Starting Debug Process...");

    try {
        // 1. Signup User
        const uniqueEmail = `debug_user_${Date.now()}@test.com`;
        console.log(`1. Signing up user: ${uniqueEmail}`);
        
        const signupRes = await fetch(`${BASE_URL}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullname: "Debug User",
                email: uniqueEmail,
                password: "password123",
                role: "student"
            })
        });

        const signupData = await signupRes.json();
        
        if (!signupRes.ok) {
            console.error("Signup Failed:", signupData);
            return;
        }

        const userId = signupData.user._id;
        const token = signupData.user.token;
        console.log(`User Created: ID=${userId}`);

        // 2. Get Course ID
        console.log("2. Fetching Courses...");
        const coursesRes = await fetch(`${BASE_URL}/course`);
        const courses = await coursesRes.json();
        
        if (!courses || courses.length === 0) {
            console.error("No courses found!");
            return;
        }

        const courseId = courses[0]._id;
        console.log(`Target Course ID: ${courseId} (${courses[0].title || courses[0].name})`);

        // 3. Attempt Purchase
        console.log("3. Attempting Purchase...");
        const purchaseRes = await fetch(`${BASE_URL}/purchase/buy`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
                userId: userId,
                bookId: courseId
            })
        });

        const purchaseData = await purchaseRes.json();
        
        console.log("--- PURCHASE RESPONSE STATUS: " + purchaseRes.status + " ---");
        console.log("RESPONSE BODY:");
        console.log(JSON.stringify(purchaseData, null, 2));

    } catch (error) {
        console.error("Script Error:", error);
    }
}

runDebug();
