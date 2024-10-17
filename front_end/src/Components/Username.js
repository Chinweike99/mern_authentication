import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import styles from '../styles/username.module.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../Store/store'
import { navigate } from 'react-router-dom'

 const Username = () => {
  const navigate = useNavigate();
  const setUserName = useAuthStore(state=> state.setUsername);
  // const username = useAuthStore(state => state.auth.username)

  const formik = useFormik({
    initialValues: {
      username: "TheodoreMangroove"
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      setUserName(values.username)
      console.log(values)
      navigate('/password')
    }
  })

  // useEffect(()=>{
  //   console.log(username)
  // })


  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder="false"></Toaster>

      <div className='flex justify-center  h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold '>Innocent Akwolu CHinweike</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Learn more on Mern Authentication... Sign In
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img className={styles.profile_img} src={assets.female7} alt='avatar'/>
            </div>

            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='username'/>
              <button className={styles.btn} type='submit'>Let's go</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Not a member 
                <Link to='/register' className='text-red-700'>Register now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Username