import React,{useState,useEffect} from "react";
import axios from "axios";

export default function Notes(){

const [title,setTitle]=useState("");
const [content,setContent]=useState("");
const [subject,setSubject]=useState("");

const [subjects,setSubjects]=useState([]);
const [notes,setNotes]=useState([]);

useEffect(()=>{

loadSubjects();
loadNotes();

},[]);

/* LOAD SUBJECTS */

const loadSubjects = async ()=>{

const res = await axios.get(
"http://localhost:5000/api/subjects"
);

setSubjects(res.data);

};

/* LOAD NOTES */

const loadNotes = async ()=>{

const res = await axios.get(
"http://localhost:5000/api/notes"
);

setNotes(res.data);

};

/* ADD NOTE */

const createNote = async ()=>{

try{

await axios.post(
"http://localhost:5000/api/notes",
{
title:title,
content:content,
subject:subject
}
);

setTitle("");
setContent("");
setSubject("");

loadNotes();

alert("Note added");

}catch(err){

console.log(err);

alert("Error adding note");

}

};

/* DELETE NOTE */

const deleteNote = async (id)=>{

await axios.delete(
"http://localhost:5000/api/notes/"+id
);

loadNotes();

};

/* DOWNLOAD NOTE */

const downloadNote = (note)=>{

const text =
"Subject: "+note.subject+"\n\n"+
"Title: "+note.title+"\n\n"+
note.content;

const blob = new Blob([text],{type:"text/plain"});

const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;

a.download = note.title + ".txt";

a.click();

};

return(

<div className="card">

<h2>Notes</h2>

<label>Subject</label>

<select
value={subject}
onChange={(e)=>setSubject(e.target.value)}
>

<option value="">
Select Subject
</option>

{subjects.map((sub)=>(
<option key={sub._id} value={sub.name}>
{sub.name}
</option>
))}

</select>

<label>Title</label>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Note title"
/>

<label>Content</label>

<textarea
value={content}
onChange={(e)=>setContent(e.target.value)}
placeholder="Write notes..."
></textarea>

<button onClick={createNote}>
Add Note
</button>

<h3>Your Notes</h3>

{notes.map((note)=>(

<div key={note._id} className="schedule-row">

<div>

<b>{note.subject}</b>

<br/>

<strong>{note.title}</strong>

<p>{note.content}</p>

</div>

<div>

<button
onClick={()=>downloadNote(note)}
>
Download
</button>

<button
onClick={()=>deleteNote(note._id)}
>
Delete
</button>

</div>

</div>

))}

</div>

);

}