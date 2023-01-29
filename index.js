// @ts-check

const { chromium } = require('playwright');
const dotenv = require('dotenv');
dotenv.config();

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const date = new Date();
  const hour = date.getHours();
  const day = date.getDay();

  await page.goto(process.env.URL_PAGE || '');
  await page.screenshot({ path: 'captura1.png' });

  await page.fill('#Username', 'abrahamserrano96@hotmail.com', {
    timeout: 1000,
  });
  await page.fill('#Password', process.env.PASSWORD || '', { timeout: 1000 });
  await page.click('button');
  await page.screenshot({ path: 'captura2.png', timeout: 2000 });
  await page.click('text=Asistencia');
  await page.screenshot({ path: 'captura4.png', timeout: 3000 });
  await page.click('span:has-text("Buscar")');
  await page.screenshot({ path: 'captura3.png', timeout: 3000 });
  await page.click('button:has-text("Acciones")');
  await page.screenshot({ path: 'captura7.png', timeout: 5000 });
  console.log(hour, 'hour');
  if (day !== 0 && day !== 6) {
    await page.screenshot({ path: 'captura9.png', timeout: 5000 });
    if (hour >= 10 && hour <= 19) {
      await page.screenshot({ path: 'captura19.png', timeout: 5000 });
      // console.log(page.locator('a:has-text("Entrada")'))
      // await page.locator('.dropdown-item a:has-text("Entrada")')
      // await page.click('.dropdown-menu:has(.show)')
      await page.click('ul.dropdown-menu.show > li > a:has-text("Entrada")');
      await page.screenshot({ path: 'entrada.png', timeout: 3000 });

      await page.click('button.btn-primary > span:has-text("Guardar")');

      await page.screenshot({ path: 'entrada1.png', timeout: 4000 });
      await browser.close();
    } else if (hour === 19) {
      await page.click('ul.dropdown-menu.show > li > a:has-text("Salida")');
      await page.screenshot({ path: 'salida.png', timeout: 100 });
      await page.click('button.btn-primary > span:has-text("Guardar")');
      await page.screenshot({ path: 'salida1.png', timeout: 400 });

      await browser.close();
    } else if (hour !== 10 && hour !== 19) {
      console.log('Its not time, little rockstar');
      await browser.close();
    }
  } else {
    await browser.close();
  }
})();
