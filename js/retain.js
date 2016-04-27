$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        },
        del: function(obj) {
          var notes = this.getAllNotes();
          var noteToDel = notes.find(function(elem, idx, arr) {
            return elem.content === obj.content;
          });
          if (noteToDel !== undefined) {
            var idxToDel = notes.indexOf(noteToDel);
            notes.splice(idxToDel, 1);
            localStorage.notes = JSON.stringify(notes);
          }
        }
    };

    var modelUtil = {
      createNote: function(noteStr) {
        var note = {
          content: noteStr
        };
        return note;
      }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            var note = modelUtil.createNote(noteStr);
            model.add(note);
            view.render();
        },

        delNote: function(noteStr) {
          var note = modelUtil.createNote(noteStr);
          model.del(note);
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


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
            var htmlNotes = $( ".note" ).click(function(){
              var noteStr = $(this).text();
              octopus.delNote(noteStr);
            });
        }
    };

    octopus.init();
});
