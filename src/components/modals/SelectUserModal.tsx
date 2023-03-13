import { Button, Checkbox, List, Flex, Group, Loader } from '@mantine/core';
import { useState } from 'react';
import classes from "./AddModalFromLocal.module.scss"
import { User } from '../../classes/user.classes';


const SelectUserModal = () => {
    const [users, setUsers] = useState<Array<User>>(new Array())
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);


    function isSelectedUser(user: User) {
        return selectedUser?.id == user?.id;
    }

    function onChangeSelection(user: User) {
        if (isLoading) return
        setSelectedUser(user);
    }

    function onClearSelection() {
        setSelectedUser(null);
    }

    async function onSave() {
        setLoading(true);
        setLoading(false);
    }

    return <>

        <List className={classes["list-files"]}
            spacing="xs"
            size="sm"
            center>
            {users.map((user) => {
                return (<List.Item style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
                    className={classes["item"]}
                    onClick={() => onChangeSelection(user)} key={user.id}
                    icon={<Checkbox disabled={isLoading} onChange={() => onChangeSelection(user)} checked={isSelectedUser(user)}
                        radius="lg" size="md" />}>
                    {user.name}
                </List.Item>)
            })}
        </List>
        <Flex p={8} mih={40} align="center" justify="flex-end" gap={"1rem"} >
            <Button disabled={isLoading} size="xs" variant="gradient" onClick={onSave}>Save</Button>
        </Flex>

        {isLoading && (<Group position="center">
            <Loader size="lg" variant="bars" />
        </Group>)}
    </>
}


export default SelectUserModal;