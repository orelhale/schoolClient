import './MyApp.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';

import Teacher from "./teacher/Teacher"
import Admin from "./admin/Admin"
import Secretary from './secretary/Secretary';
import System from './system/System';
import Unauthorized from './system/Unauthorized';
import * as React from 'react';


function MyApp(props) {


	

	return (
		<div className="MyApp">
			{/* <div className="header">header</div> */}
		
			<div className="body">
			{/* <div><Link to="/login">login</Link></div>
				<div><Link to="/teacher">teacher</Link></div>
				<div><Link to="/admin">admin</Link></div>
				<div><Link to="/secretary">secretary</Link></div>
				<div><Link to="/unauthorized">unauthorized</Link></div>
				 */}
					<Routes>

						<Route path="/*" element={<System />} />
					
						<Route path="teacher/*" element={<Teacher />}/>

						<Route path="admin/*" element={<Admin />}/>
						
						<Route path="secretary/*" element={<Secretary />}/>

						<Route path="unauthorized/*" element={<Unauthorized />}/>

						{/* TODO check */}
						{/* <Route path="/*" element={<h1>dddddddddddddd</h1>}/> */}
						{/* TODO check */}

					</Routes>
	
			</div>

			{/* <div className="footer">footer</div> */}
		</div>
	);
}

export default MyApp;
