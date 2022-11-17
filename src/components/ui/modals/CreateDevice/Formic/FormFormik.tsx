import {FC} from 'react';
import {Form, Formik} from "formik";
import TextField from "./TextField";

const FormFormik:FC = () => {

	const onSubmit = () => {

	}

	return (
			<div className='w-11/12 m-auto'>
				<Formik initialValues={{
					type: '',
					brand: '',
					name: '',
					price: 0,
				}} onSubmit={onSubmit}>
					{ (formik:any) => (
							<div>
								<h1>Formik</h1>
								<Form>
									<TextField label='name' name='name' type='text'/>
								</Form>
							</div>
					)}


				</Formik>
			</div>

	);
};

export default FormFormik;