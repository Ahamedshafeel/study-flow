import React,{useState,useEffect} from "react";

export default function Settings(){

const [settings,setSettings]=useState({
studyStart:"09:00",
studyEnd:"13:00"
});

useEffect(()=>{

const saved=localStorage.getItem("settings");

if(saved){
setSettings(JSON.parse(saved));
}

},[]);

const handleChange=(e)=>{

setSettings({
...settings,
[e.target.name]:e.target.value
});

};

const saveSettings=()=>{

localStorage.setItem(
"settings",
JSON.stringify(settings)
);

alert("Settings Saved");

};

return(

<div className="card">

<h2>Preferences</h2>

<label>Study Start Time</label>
<input
type="time"
name="studyStart"
value={settings.studyStart}
onChange={handleChange}
/>

<label>Study End Time</label>
<input
type="time"
name="studyEnd"
value={settings.studyEnd}
onChange={handleChange}
/>

<button onClick={saveSettings}>
Save Settings
</button>

</div>

);

}