import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    IconButton,
    CloseButton,
    useToast
} from '@chakra-ui/react'
import { TfiAlignJustify } from "react-icons/tfi";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { isTokenValid } from '../utils/auth';
const AdminSidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(() => {
        const sessionUser = localStorage.getItem('user')

        if (!isTokenValid()) {
            navigate('/login')
            return
        }

        setUser(JSON.parse(sessionUser))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        toast({
            title: 'Logout Successful',
            status: 'success',
            position: 'bottom-right',
            variant: 'top-accent',
            duration: 3000,
            isClosable: true,
        })
        navigate('/login')
    }

    return (

        <div className='w-full mt-4 self-start flex items-center justify-between'>
            <IconButton
                aria-label='Search database'
                icon={<TfiAlignJustify className='text-black font-semibold' />}
                onClick={onOpen}
                size={'lg'} />
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
                        <div className='w-full flex items-center gap-4'>
                            <CloseButton onClick={onClose} />
                            <h1 className='text-xl font-semibold'>Admin Dashboard</h1>
                        </div>
                    </DrawerHeader>

                    <DrawerBody>
                        <div className='w-full flex flex-col gap-2'>
                            <a href="/" className='hover:bg-slate-100 hover:font-bold hover:transition-all p-4 rounded-xl flex items-center gap-2'>
                                <TiHome />
                                Dashboard
                            </a>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <a href="/manageuser" className='hover:bg-slate-100 hover:font-bold hover:transition-all p-4 rounded-xl flex items-center gap-2'>
                                <FaUser />
                                Manage User
                            </a>
                        </div>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button width={'sm'} variant={'solid'} colorScheme={'red'} onClick={handleLogout}>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className='flex flex-col items-end gap-1'>
                <h1 className='text-xl font-bold'>Welcome to Dashboard, {user?.username}!</h1>
                <p className='text-sm font-normal'>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>
    )
}

export default AdminSidebar