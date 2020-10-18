import { useForm } from 'react-hook-form'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Layout from '../components/Layout'

const SignupPage = () => {
  const { user } = useAuth0()
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Layout title="Signup">
      <h1>Signup</h1>
      {formState.isSubmitting && <div>submitting...</div>}
      {formState.isSubmitted && <div>submitted</div>}
      {formState.isSubmitSuccessful && <div>submit successful</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <img src={user.picture} width="64" height="64" />
          <input type="hidden" name="picture" defaultValue={user.picture} ref={register} />
        </div>
        <div>
          mail: <input name="email" type="email" defaultValue={user.email} ref={register} />
        </div>
        <div>
          age:{' '}
          <input
            name="age"
            type="number"
            required
            ref={register({ required: true, min: 18 })}
            style={{ borderColor: errors.age && 'red' }}
          />
        </div>
        <div>
          <button disabled={!formState.isValid}>Submit</button>
        </div>
      </form>
    </Layout>
  )
}

export default withAuthenticationRequired(SignupPage)
