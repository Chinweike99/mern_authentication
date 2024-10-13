import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import styles from '../styles/username.module.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { validatePassword } from '../helper/validate'
import { ConvertToBase64 } from '../helper/convert'

const Register = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, {profile: file || ""})
      console.log(values)
    }
  })

  /**Formik does not support file uplaod so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await ConvertToBase64(e.target.files[0]);
    setFile(base64)
  }

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder="false"></Toaster>

      <div className='flex justify-center pt-[10rem]  h-screen'>
        <div className={styles.glass} style={{width: "50%"}}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold '>Register Auth</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Join our community
            </span>
          </div>

          <form className='py-1 ' onSubmit={formik.handleSubmit}>

            <div className='profile flex  justify-center py-4'>
              <label htmlFor='profile'>
                <img className={styles.profile_img} src={file || assets.female7} alt='avatar'/>
              </label>
              
               <input onChange={onUpload} type='file' id='profile' name='profile'/>
            </div>

            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='username'/>
              <input {...formik.getFieldProps('email')} className={styles.textbox} type='email' placeholder='email'/>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='password'/>
              <input {...formik.getFieldProps('confirm_password')} className={styles.textbox} type='password' placeholder='confirm_password'/>
              <button className={styles.btn} type='submit'>Register</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Already registered? 
                <Link to='/password' className='text-red-700'> login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register