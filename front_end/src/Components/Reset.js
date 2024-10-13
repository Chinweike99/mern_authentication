import React from 'react'
// import { Link } from 'react-router-dom'
import styles from '../styles/username.module.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { resetPassword } from '../helper/validate'

const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password: "Chinweike12@",
      confirm_password: "Chinweike12@"
    },
    validate: resetPassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values)
    }
  })


  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder="false"></Toaster>

      <div className='flex justify-center pt-[10rem]  h-screen'>
        <div className={styles.glass} style={{width: "50%"}}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold '>Reset Auth</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password
            </span>
          </div>

          <form className='pt-20' onSubmit={formik.handleSubmit}>

            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='New Password'/>
              <input {...formik.getFieldProps('confirm_password')} className={styles.textbox} type='password' placeholder='Confirm Password'/>
              <button className={styles.btn} type='submit'>Reset</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset