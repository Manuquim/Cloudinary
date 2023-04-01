import React, { useState } from "react";


export const Home = () => {
	const [file,setFile]=useState("");
	const [fileURL,setFileURL]=useState("");

	const handleImage = (evento) =>{
		if(evento.target.files.length!=0){
			setFile(evento.target.files[0])
		}
	}

	const enviarArchivo = async () =>{
		console.log("dentro de enviarArchivo");
		if(!file){ alert ("por favor, seleccione un archivo"); return false;}

		try{
			const form=new FormData();
			form.append("img",file);

			const response = await fetch("https://3001-4geeksacade-reactflaskh-zjwf55tr84q.ws-eu93.gitpod.io/img",
			{
				method: 'POST',
				body: form,
				//mode: 'no-cors'
			})
			const data = await response.json();			
			setFileURL(data.img_url);
		}
		catch(e){
			console.error("ERROR",e);
		}

	}
	return (
		<div className="row m-5 bg-secondary bg-opacity-10">
			<div className="col">
				<h4 className="m-2">CLOUDINARY</h4>
				<input type="file" className="form-control" accept="image/jpeg"
				onChange={(e)=>handleImage(e)}/>
				<br/>
				<button className="btn btn-primary mb-4" onClick={enviarArchivo}>ENVIAR ARCHIVO</button>
				<br/>
				{fileURL!==""?
				<img src={fileURL} className="img-fluid" width="400" height="400"/>
				: ""}

			</div>
		</div>
	);
};
