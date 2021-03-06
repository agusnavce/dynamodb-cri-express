import { customers } from './customers';
import { employees } from './employees';
import { orders } from './orders';

var action = process.argv[2];

main();

async function main() {
  try {
    await customers();
    await employees();
    await orders();
  } catch (err) {
    console.log(err);
  }

  console.log('Done');
}
