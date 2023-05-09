import { useRef, useState } from 'react';
import hitToast from '../helpers/hitToast';

export default function SubscriptionForm() {
  let [email, setEmail] = useState('');
  let [alertClass, setAlertClass] = useState('');
  var parentComp = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(validate(email))
    if (!validate(email)) {
      setAlertClass('alert-validate');
      return;
    }
    fetch('http://103.108.146.90:5000/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }).then(res => res.text())
      .then(data => JSON.parse(`${data}`))
      .then(data => hitToast( data.success ? 'success' : 'error',data.message))
      .catch(() => hitToast('error','Something went wrong. Please try again.', ))

    setAlertClass('');
  }

  const validate = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return (
    <form className="w-full flex-w flex-c-m validate-form" onSubmit={handleSubmit}>
      <div ref={parentComp} className={"wrap-input100 validate-input where1 " + alertClass} data-validate="Valid email is required: user@email.domain">
        <input className="input100 placeholder0 s2-txt2" type="email" name="email" placeholder="Enter Email Address" onChange={e => setEmail(e.target.value)} />
        <span className="focus-input100"></span>
      </div>

      <button className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1" onClick={handleSubmit}>
        Subscribe
      </button>
    </form>
  );
}
