import { Parcel } from "@parcel/core";
import { fileURLToPath } from "url";
import { inspect } from "util";
import Chalk from "chalk";

const relative_path = (path: string) =>
    fileURLToPath(new URL(path, import.meta.url))

const tidy_name = (str: string) =>
    str
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ")
        .map(c => c[0].toUpperCase() + c.slice(1).toLowerCase())
        .join(' ')


const entries = [
    relative_path('../resources/*'),
]

const port = parseInt(process.env.PORT || '3000');
const bundler = new Parcel({
    entries,
    config: relative_path('../resources/parcel_config.json'),
    mode: 'development',
    serveOptions: { port },
    hmrOptions: { port },
    logLevel: 'verbose',
    additionalReporters: []
})

console.clear();
await bundler.watch((err, event: any) => {

    if (err || event.type === 'buildFailure') {
        console.log('\n' + 
            Chalk.redBright('🛑 Unable to build:\n') +
            Chalk.whiteBright(event.diagnostics.find((d: any) => d.message)?.message || err?.message || 'Unknown error')
        );

        return;
    }

    if (!event) return;
    console.clear();

    const colour = event.type === 'buildSuccess' ? 'greenBright' : 'yellowBright';
    let changed_files = !event.changedAssets ? [] : [...event.changedAssets.values()].map(v => inspect(v).slice(6, -1)).filter(f => !f.includes('node_modules'));
    const changes = changed_files.length;

    if (changed_files.length > 5) {
        changed_files = changed_files.slice(0, 5);
        changed_files.push(`+ ${changes - 5} more`);
    }


    console.log(
        Chalk[colour]('🚀 ' + tidy_name(event.type)) +
        Chalk.bold(Chalk.whiteBright(` [${event.buildTime ?? '0'}ms]\n`)) +
        Chalk.whiteBright(`-------------------\n`) +
        Chalk.bold(Chalk.whiteBright(changes) + ' ') +
        Chalk.cyanBright(`Changed file${changes === 1 ? '' : 's'}: \n`) +
        Chalk.whiteBright(
            changed_files.map((file: string) => ' ' + (!file.toString().startsWith('+') ? '- ' : '') + file.toString()).join('\n')
        ) + '\n\n' +
        Chalk.cyanBright(`Site available at `) +
        Chalk.bold(Chalk.whiteBright(`http://localhost:${port}/`))

    )



});