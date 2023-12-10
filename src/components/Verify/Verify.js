import React, { useState } from 'react'
import OTPInput from './OTPinput'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Verify() {
  const { id } = useParams();
  const [pin, setPin] = useState('');
  console.log("OTP",pin);

  function splitStringWithPlus(inputString) {
    // Find the index of the '+' character
    const plusIndex = inputString.indexOf('+');
  
    if (plusIndex !== -1) {
      // Split the input string into two parts based on the '+' character
      const part1 = inputString.substring(0, plusIndex);
      const part2 = inputString.substring(plusIndex);
  
      // Return an array with two parts
      return [part1, part2];
    } else {
      // If '+' is not found, return the entire string as the first part
      return [inputString];
    }
  }

  const result = splitStringWithPlus(id)

  const data = {"phoneNumber": result[1], "requestId": result[0],"otp": pin}


  const verify = () => {
    axios
        .post("https://dev.api.goongoonalo.com/v1/auth/verify_otp", data)
        .then(async res => {
        await Swal.fire({
            icon: 'success',
            title: 'Verification Successful',
        }).then((result) => {
            if (result.isConfirmed){
            window.location.href='/playlist';
            }
        })
        })
        .catch(err => {
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Invalid OTP',
            footer: JSON.stringify(err.response.data.message)
        })
        });
    }

  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='p-4 md:p-0 md:w-1/2 lg:w-1/4 flex flex-col gap-y-4'>
            <div className='text-3xl font-bold text-primary'>
                OTP Verification
            </div>
            <div className='text-sm'>
            We have sent and OTP to {result[1]}. Please enter the code received to verify.
            </div>
            <div className='flex items-center justify-center'>
            <OTPInput
              length={4}
              className="otpContainer"
              inputClassName="otpInput"
              isNumberInput
              autoFocus
              onChangeOTP={otp => setPin(otp)}
            />               
            </div>
            <div className=''>
                <button className='w-full btn btn-primary' onClick={verify}>Verify</button>
            </div>
            
        </div>
    </div>
  )
}

export default Verify