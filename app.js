const chalk = require("chalk");
const fs = require("fs");
const { demandOption } = require("yargs");
const yargs = require("yargs");
const { addNote, getNote, removeNote, editNote, listNotes } = require("./notes");

yargs.version("17.6.2");

// creat yargs comand
yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: "The title of the note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "The body of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.body)
        console.log(chalk.green("Succses !"))
    }
})

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "the title of note to remove",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
        console.log(chalk.red.bold(`The note is deleted!`))
    }
})

yargs.command({
    command: "edit",
    describe: "edite note using its title",
    builder: {
        title: {
            describe: "the title of note to remove",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "The body of the note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        editNote(argv.title, argv.body)
        console.log(chalk.bgGreen.black(`${argv.title} note is changed to ${argv.body}`))
    }
})
yargs.command({
    command: "list",
    describe: "List all notes",
    handler: () => listNotes()
})
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "the title of note to remove",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => getNote(argv.title)
})

yargs.parse();