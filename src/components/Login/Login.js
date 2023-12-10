import axios from 'axios';
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import Swal from 'sweetalert2';

function Login() {

    const [value, setValue] = useState()

    const data = {"phoneNumber":value}

    const login = () => {
        axios
            .post("https://dev.api.goongoonalo.com/v1/auth/login", data)
            .then(async res => {
            await Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'OTP sent to the number',
                // footer: 'Project can be viewed now.'
            }).then((result) => {
                if (result.isConfirmed){
                    console.log(res.data.requestId);
                    window.location.href='/verify/'+res.data.requestId+value;
                }
            })
            })
            .catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Enter 10 digit mobile number!',
                footer: JSON.stringify(err.response.data.message)
            })
            });
        }
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='p-4 md:p-0 md:w-1/2 lg:w-1/4 flex flex-col gap-y-4'>
            <div className='text-3xl font-bold text-primary'>
                Sign In
            </div>
            <div className='text-sm'>
            Please enter your mobile number to login.
            We will send an OTP to verify your number.
            </div>
            <div className='text-xl border-solid border-2 p-2 rounded-lg'>
                <PhoneInput international
                    placeholder="Phone number"
                    defaultCountry='IN'
                    country="IN"
                    limitMaxLength={true}
                    withCountryCallingCode
                    countryCallingCodeEditable={false}                    
                    value={value}
                    onChange={setValue}/>
            </div>
            <div className=''>
                <button className='w-full btn btn-primary' onClick={login}>Sign In</button>
            </div>
            
        </div>
    </div>
  )
}

export default Login