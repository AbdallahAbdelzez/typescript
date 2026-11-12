//1
class User {
    protected _age!: number
    constructor(
        public id: number,
        protected name: string,
        public email: string,
        private password: string,
        private phone: string,
        age: number,
    ) {
        this.age = age;
    }
    displayInfo(): void {
        console.log(
            this.id,
            this.name,
            this.email,
            this.age,
            this.phone,
            this.password,
        )
    }
    get age(): number {
        return this._age;
    }
    set age(value: number) {
        if (value >= 18 && value <= 60) {
            this._age = value;
        } else {
            throw new Error("Age must be between 18 and 60");
        }
    }
    private notebooks: NoteBook[] = [];

    addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }

    removeNotebook(title: string): void {
        this.notebooks = this.notebooks.filter(
            notebook => notebook.title !== title
        );
    }

    showNotebooks(): void {
        this.notebooks.forEach(notebook => {
            console.log(notebook.title);
        });
    }
}

class Note {
    constructor(
        public id: number,
        public title: string,
        protected content: string,
        protected userId: User
    ) { }
    get ownerId(): number {
        return this.userId.id;
    }
    preview(length: number = 30): string {
        return this.content.length > length
            ? this.content.substring(0, length) + "..."
            : this.content;
    }
}



class NoteBook {
    private notes: Note[] = []
    constructor(public title: string) { }


    addNote(id: number, title: string, content: string, owner: User): Note {
        const note = new Note(id, title, content, owner)
        this.notes.push(note)
        console.log(`Note added: ${note.title}`)
        return note
    }


    removeNote(id: number): void {
        const before = this.notes.length
        this.notes = this.notes.filter(n => n.id !== id)
        console.log(this.notes.length < before ? `Note ${id} removed` : "Note not found")
    }

    showNotes(): void {
        this.notes.forEach(n =>
            console.log(`#${n.id} | ${n.title} | ${n.preview()}`)
        );
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
    private notebook: NoteBook;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        super(id, name, email, password, phone, age);

        this.notebook = new NoteBook("Admin Notes");
    }


    manageNotes(
        action: "add" | "delete" | "show",
        id?: number,
        title?: string,
        content?: string
    ): void {

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


class Storage<T> {
    private items: T[] = []

    addItem(item: T): void {
        this.items.push(item)
    }

    removeItem(item: T): void {
        this.items = this.items.filter(i => i !== item)
    }

    getAllItems(): T[] {
        return this.items
    }
}





const user1 = new User(
    1,
    "Abdallah",
    "email@test.com",
    "123456",
    "01000000",
    25
);

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

admin.manageNotes(
    "add",
    1,
    "Meeting",
    "Discuss project deadlines and assign tasks to the team"
);

admin.manageNotes("show");

admin.manageNotes("delete", 1);

const notebook = new NoteBook("Work");
notebook.addNote(1, "Meeting", "wefrgasvfgrt", user1);
notebook.addNote(2, "Todo", "gfagergrgfeardfc", user1);
notebook.showNotes();
console.log(notebook)
notebook.removeNote(1);
notebook.showNotes();
const noteStorage = new Storage<Note>();

const note1 = new Note(
    1,
    "Meeting",
    "Discuss project deadlines",
    user1
);

const note2 = new Note(
    2,
    "Tasks",
    "Complete the assignment",
    user1
);

noteStorage.addItem(note1);
noteStorage.addItem(note2);

console.log("All Notes:", noteStorage.getAllItems());

noteStorage.removeItem(note1);

console.log("After Removing:", noteStorage.getAllItems());