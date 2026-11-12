"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//1
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    displayInfo() {
        console.log(this.id, this.name, this.email, this.age, this.phone, this.password);
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value >= 18 && value <= 60) {
            this._age = value;
        }
        else {
            throw new Error("Age must be between 18 and 60");
        }
    }
    notebooks = [];
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    removeNotebook(title) {
        this.notebooks = this.notebooks.filter(notebook => notebook.title !== title);
    }
    showNotebooks() {
        this.notebooks.forEach(notebook => {
            console.log(notebook.title);
        });
    }
}
class Note {
    id;
    title;
    content;
    userId;
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    get ownerId() {
        return this.userId.id;
    }
    preview(length = 30) {
        return this.content.length > length
            ? this.content.substring(0, length) + "..."
            : this.content;
    }
}
class NoteBook {
    title;
    notes = [];
    constructor(title) {
        this.title = title;
    }
    addNote(id, title, content, owner) {
        const note = new Note(id, title, content, owner);
        this.notes.push(note);
        console.log(`Note added: ${note.title}`);
        return note;
    }
    removeNote(id) {
        const before = this.notes.length;
        this.notes = this.notes.filter(n => n.id !== id);
        console.log(this.notes.length < before ? `Note ${id} removed` : "Note not found");
    }
    showNotes() {
        this.notes.forEach(n => console.log(`#${n.id} | ${n.title} | ${n.preview()}`));
    }
}
//2 
// class Admin extends User {
//     private notes: Note[] = []
//     constructor(
//         id: number,
//         name: string,
//         email: string,
//         password: string,
//         phone: string,
//         age: number,
//     ) {
//         super(id, name, email, password, phone, age);
//     }
//     manageNotes(action: "add" | "delete" | "show", note?: Note): void {
//         if (action === "add" && note) {
//             this.notes.push(note)
//             console.log(`Admin name ${this.name} Note added: ${note}`)
//         } else if (action === "delete" && note) {
//             this.notes = this.notes.filter(n => n.id !== note.id);
//             console.log(`Admin name ${this.name} Note deleted: ${note}`)
//         } else if (action === "show") {
//             this.notes.forEach(n =>
//                 console.log(`NoteId:${n.id}  Title: ${n.title} OwnerId: ${n.ownerId}`)
//             )
//             // console.log("Notes", this.notes)
//         }
//     }
// }
//3
class Admin extends User {
    notebook;
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
        this.notebook = new NoteBook("Admin Notes");
    }
    manageNotes(action, id, title, content) {
        if (action === "add" && id !== undefined && title && content) {
            this.notebook.addNote(id, title, content, this);
        }
        else if (action === "delete" && id !== undefined) {
            this.notebook.removeNote(id);
        }
        else if (action === "show") {
            this.notebook.showNotes();
        }
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
const user1 = new User(1, "Abdallah", "email@test.com", "123456", "01000000", 25);
const book1 = new NoteBook("Work");
const book2 = new NoteBook("Study");
const book3 = new NoteBook("Personal");
// Add
user1.addNotebook(book1);
user1.addNotebook(book2);
user1.addNotebook(book3);
// Show
user1.showNotebooks();
// Remove
user1.removeNotebook("Work");
// Show again
user1.showNotebooks();
// Check reference
console.log(book1.title);
const user2 = new User(1, "abdallah", "email@jds.com", "1234567", "1243657", 20);
user1.displayInfo();
console.log(user1.age);
const admin = new Admin(2, "Ali", "ali@mail.com", "1234", "0100000", 30);
admin.displayInfo();
admin.manageNotes("add", 1, "Meeting", "Discuss project deadlines and assign tasks to the team");
admin.manageNotes("show");
admin.manageNotes("delete", 1);
const notebook = new NoteBook("Work");
notebook.addNote(1, "Meeting", "wefrgasvfgrt", user1);
notebook.addNote(2, "Todo", "gfagergrgfeardfc", user1);
notebook.showNotes();
console.log(notebook);
notebook.removeNote(1);
notebook.showNotes();
const noteStorage = new Storage();
const note1 = new Note(1, "Meeting", "Discuss project deadlines", user1);
const note2 = new Note(2, "Tasks", "Complete the assignment", user1);
noteStorage.addItem(note1);
noteStorage.addItem(note2);
console.log("All Notes:", noteStorage.getAllItems());
noteStorage.removeItem(note1);
console.log("After Removing:", noteStorage.getAllItems());
//# sourceMappingURL=index.js.map