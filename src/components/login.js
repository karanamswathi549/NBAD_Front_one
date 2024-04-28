// import React, { useState } from 'react';
// import { useAuth } from '../contexts/authContext';
// import {Link} from 'react-router-dom'
// const LoginPage = () => {
//   const { login } = useAuth();
//   const [email, setUserEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     // Validate username and password as needed
//     try {
//       await login({ email, password });
//     } catch (error) {
//       // Handle login error
//       console.error('Login failed:', error.message);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               <form>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setUserEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-primary btn-block mt-3"
//                   onClick={handleLogin}
//                 >
//                   Login
//                 </button>
//               </form>
//             </div>
//             <div className="text-center mt-3">
//               <p>Don't have an account? <Link to={'/register'}>Sign Up</Link> </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export default function SimpleCard() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}