import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    const { uuid } = req.body;

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto(`https://w1.doctors.sy/api/account-info/${uuid}/phone/?format=json`, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        const data = await page.evaluate(() => {
            return JSON.parse(document.body.innerText);
        });

        await browser.close();

        if (data.phone_numbers) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'No phone numbers found' });
        }
    } catch (error) {
        console.error('Puppeteer error:', error);
        res.status(500).json({ message: 'Scraping failed', error: error.message });
    }
}