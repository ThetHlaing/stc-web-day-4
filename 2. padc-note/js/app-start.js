(function(){

    const model = {
        init: function() {
            if (!localStorage.notes) {
                this.save([]);
            }
        },
        add: function(obj) {
            const data = this.getAllNotes();
            data.push(obj);
            this.save(data);
        },
        save: function(noteList){
            console.log(noteList);
            localStorage.notes = JSON.stringify(noteList);
        },        
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    const octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
            });
            view.render();
        },
        getNotes: function() {
            return model.getAllNotes();
        },
        init: function() {
            model.init();
            view.init();
        }
    };


    const view = {
        init: function() {
            this.noteList = $('#notes');
            const newNoteForm = $('#new-note-form');
            const newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });     
            view.render();
        },
        render: function(){
            let htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += `<li class="note" data-content="${note.content}">
                ${note.content}
                <span class='close'>x</span></li>`;
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
})();