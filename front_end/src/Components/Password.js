import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import styles from '../styles/username.module.css'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { validatePassword } from '../helper/validate'
import { useFetch } from '../hooks/fetch.hooks'
import { useAuthStore } from '../Store/store'
import { verifyPassword } from '../helper/helper'


const Password = () => { 
  const navigate = useNavigate()
  const {username} = useAuthStore(state => state.auth)
  // api endpoint request
  const {isLoading, apiData, serverError} = useFetch(`/user/${username}`);

  // Form --><-->::<::>::<::>::<::>::<:::><::>
  const formik = useFormik({
    initialValues: {
      password: ""
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      let loginPromise = verifyPassword({ username, password: values.password });
      toast.promise(loginPromise, {
        loading: "Checking password ...",
        success: <b>Login was successful ...</b>,
        error: <b>Unable to login</b>
      });
      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      })
      console.log(values)
    }
  })
  
  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading ...</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>


  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder="false"></Toaster>

      <div className='flex justify-center pt-[10rem]  h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold '>Hello {apiData?.firstName || username}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Learn more on Mern Authentication
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img className={styles.profile_img} src={apiData?.profile || assets.female7} alt='avatar'/>
            </div>

            <div className='textbox flex flex-col items-center gap-3'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='Password'/>
              <button className={styles.btn} type='submit'>Sign in</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                  Forgot password
                <Link to='/recover' className='text-red-700'>
                  recover now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password