import React,{useState} from "react";
import { Container, Form, FormGroup, FormLabel, Button } from 'react-bootstrap'
import image from '../assets/1_bdXAr_FLHv-5kMLuNXUHFA.png'
export default () => {

  const [name, setName] = useState('')

  function changeName(input){
    setName(input)
  }

  function enterLoby(){
    localStorage.setItem('username', name)
  }

  return (
    <Container style={{backgroundImage: `url(${image})`, backgroundSize: '100%', width: '50%', paddingTop: '12%', paddingBottom: '14%', paddingLeft: '17%', marginTop: '3%', backgroundRepeat: 'no-repeat'}}>
      <Form>
        <FormGroup>
          <FormLabel style={{color: '#649D66'}}> Username: </FormLabel><br/>
          <input style={{borderWidth: '0px 0px 1px 0px', borderColor:'#649D66'}} type='text' onChange={
            (e) => {
              changeName(e.target.value)
            }
          } />
        </FormGroup>
        <Button style={{backgroundColor: 'transparent', color: '#649D66', borderColor:'#649D66'}}> Enter Loby </Button>
      </Form>
    </Container>
  );
};
