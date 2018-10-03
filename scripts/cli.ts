var action = process.argv[2];

main();

async function main() {
  try {
    switch (action) {
      case 'createEntities':
        break;
      default:
        console.log(`No action found for ${action}`);
    }
  } catch (err) {
    console.log(err);
  }

  console.log('Done');
}
