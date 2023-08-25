
import { Alert } from "@mui/material";
import { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom";

export const Form = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [saveDetails, setSaveDetails] = useState<Array<{ name: string; email: string; number: string }>>([]);
  const [fillDetails, setFillDetails] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [numberError, setNumberError] = useState<boolean>(false)

  const navigate = useNavigate();

  useEffect(() => {
    const savedDetails = localStorage.getItem('savedDetails');
    if (savedDetails) {
      setSaveDetails(JSON.parse(savedDetails));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedDetails', JSON.stringify(saveDetails));
  }, [saveDetails]);

  const validateEmail = (email: string) => {
    const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regExp.test(email);
  };

  const validatePhone = (number: string) => {
    return number.length >= 10;
  };

  const handleSubmit = () => {
    const newData = {
      name: name,
      email: email,
      number: number
    };

    if (!newData.name || !newData.email || !newData.number) {
      setFillDetails(true);
      return;
    }

    if (!validateEmail(newData.email)) {
      setEmailError(true);
      return;
    }

    if (!validatePhone(newData.number)) {
      setNumberError(true);
      return;
    }

    setSaveDetails(prevState => [...prevState, newData]);
    setFillDetails(false);
    setEmailError(false);
    setNumberError(false);

    navigate('/DataTable')

    setName('');
    setNumber('');
    setEmail('');

  };


  return (
    <>

      <div className="formbold-main-wrapper relative h-[100vh] w-full" >

        <div className="formbold-form-wrapper absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2">

          <div className="formbold-steps">
            <h1 className="font-mono text-center font-bold text-[32px]">
              Form
            </h1>
            <hr className="h-[2px] bg-black" />
          </div>

          <form action="" className="my-2.5 p-2.5 border border-solid border-black">

            <div className="my-2">
              <label htmlFor="Name" className="font-mono block font-bold text-lg">Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Enter your name"
                id="Name"
                className="py-2.5 w-full outline-none"
                value={name}
                required
                onChange={(e) => { setName(e.target.value) }}
              />
              <hr className="h-[1px] bg-black" />
            </div>


            <div className="my-2">
              <label htmlFor="email" className="block font-mono font-bold text-lg">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                id="email"
                required
                className="py-2.5 w-full outline-none"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <hr className="h-[1px] bg-black" />
            </div>

            <div className="my-2">
              <label htmlFor="phone" className="block font-mono font-bold text-lg"> Phone No </label>
              <input
                type="number"
                name="phone"
                id="phone"
                required
                placeholder="000-000-0000"
                className="py-2.5 w-full outline-none"
                value={number}
                onChange={(e) => { setNumber(e.target.value) }}
              />
              <hr className="h-[1px] bg-black" />
            </div>

          </form>

          <div className="flex justify-center gap-2">
            <div className="Button text-center">
                <button onClick={handleSubmit} className="font-sans w-[100px] text-center font-bold border-2 border-solid border-black rounded-lg text-[24px]">Next</button>
            </div>
          </div>

          <div className="m-2">
            {
              fillDetails && <Alert severity="error" color="warning">Please Fill All Details</Alert>
            }
          </div>

          <div className="m-2">
            {
              emailError && <Alert severity="error" color="warning">Enter Valid Email</Alert>
            }
          </div>

          <div className="m-2">
            {
              numberError && <Alert severity="error" color="warning">Number Should be 10 digits</Alert>
            }
          </div>

        </div>

      </div>

    </>
  )
}

