const apps = [
    {
        id: 'binary-console',
        name: 'Binary Console Image',
        status: 'Live',
        description: 'Generate glowing hacker-console PNGs from binary text.',
        seoTitle: 'Hacker Terminal Image Generator | Free Binary Code PNGs',
        metaDescription: 'Free browser-based hacker terminal image generator. Turn binary or any text into glowing green console PNGs with custom size, color, and seed. No upload.',
        keywords: [
            'hacker terminal image generator',
            'binary code image generator',
            'terminal png generator',
            'green console text image',
            'matrix style text image',
            'hacker background generator',
        ],
        body: [
            "Binary Console Image is a free hacker terminal image generator that runs entirely in your browser. Type any text — binary strings, hex dumps, a secret message, whatever — and it gets repeated and wrapped into a dense console grid, then rendered to a canvas with per-character brightness variation, a soft phosphor glow, and a CRT-style vignette. The result looks like a still frame from a movie hacking montage, and it exports as a crisp PNG at whatever resolution you ask for.",
            "Using it is simple: enter your terminal text, set the width and height (or drag the scale slider to resize proportionally), then tune the padding, base color, and seed. The seed drives a deterministic random generator, so the same settings always reproduce the exact same image — hit New Layout to shuffle the character brightness pattern until you find one you like, then hit Download PNG. Green is the classic look, but the color picker means you can generate amber, cyan, red, or any other console palette.",
            "It exists because I wanted binary-code tile images for project cards on this site, and every stock 'hacker screen' image I found was watermarked, low-resolution, or just wrong. Building a generator took an evening and gives pixel-perfect results at any size. Everything happens client-side: nothing is uploaded, there are no accounts, and there is no watermark — the PNG is yours.",
        ],
    },
    {
        id: 'doctor-chatbot',
        name: 'Ultra Low Latency Doctor',
        status: 'Live',
        description: 'Receive an immediate, client-side medical diagnosis.',
        seoTitle: 'Fastest Doctor Chatbot Ever Made (a Joke App)',
        metaDescription: "The world's fastest doctor chatbot: zero latency, one diagnosis. A joke app that answers every symptom instantly. For entertainment — not medical advice.",
        keywords: [
            'fastest doctor chatbot',
            'ultra low latency chatbot',
            'instant diagnosis chatbot',
            'doctor chatbot joke',
            'funny medical chatbot',
            'ai doctor parody',
        ],
        body: [
            "The Ultra Low Latency Doctor is, as far as I know, the fastest doctor chatbot ever built. Dr. Instant responds to any symptom in zero milliseconds of server time — no API call, no model inference, no streaming tokens. How? The entire medical knowledge base ships in the client bundle, and it consists of exactly one diagnosis. Describe a headache, a funny knee, or mild existential dread, and the answer arrives instantly. It is always cancer. To be perfectly clear: this is a joke app.",
            "Using it works like any chat interface: type what's bothering you, press Enter, and receive your diagnosis before the network tab even wakes up. There's no rate limit, no login, and no waiting room. The doctor is permanently online and accepts every condition, because triage is easy when the differential has one entry.",
            "It exists as a parody of two things at once: AI health chatbots that confidently diagnose you from a sentence, and latency benchmarks that get bragged about without asking what the response is actually worth. This app wins both categories — instant answers, one hundred percent consistency — while being medically useless by design. It is for entertainment purposes only and is not medical advice. If something actually hurts, please see a real doctor, who will be slower and dramatically more accurate.",
        ],
    },
];

export default apps;
