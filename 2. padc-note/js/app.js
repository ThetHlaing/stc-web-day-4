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
        remove: function(noteStr){
            const data = this.getAllNotes();
            data.forEach(function(note,index){
                if(note.content === noteStr){
                    data.splice(index,1);
                }
            });
            this.save(data);
        },
        save: function(noteList){
            localStorage.notes = JSON.stringify(noteList);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    const octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date : Date.now()
            });
            view.render();
        },
        removeNote : function(noteStr){
            model.remove(noteStr);
            view.render();
        },
        getNotes: function() {
            return model.getAllNotes().reverse();
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
            $(document).on('click','.note .close',function(e){
                octopus.removeNote(e.target.parentNode.dataset.content);                
            });
            view.render();
        },
        render: function(){
            let htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += `<li class="note" data-content="${note.content}">${note.content}
                <span class='note-date'>${Date(note.date)}</span>
                <span class='close'>x</span>
                </li>`;
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
})();