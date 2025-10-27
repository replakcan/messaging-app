import { useState } from 'react'
import '../styles/new-chat-creator-dialog.css'
import { axiosInstance } from '../api/axios-instance'

const NewChatCreatorDialog = ({ isDialogOpen, onCloseDialogClick }) => {
    const [newConvoFormData, setNewConvoFormData] = useState({ to: '', text: '' })

    const handleChange = (e) => {
        const { name, value } = e.target

        setNewConvoFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axiosInstance.post('/messages', newConvoFormData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return <>
        <dialog className='new-convo-dialog' open={isDialogOpen}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        id="phone"
                        name="to"
                        type="text"
                        onChange={handleChange}
                        value={newConvoFormData.to} />
                </fieldset>
                <fieldset>
                    <label htmlFor="newMessage">Start conversation:</label>
                    <input
                        id="newMessage"
                        name="text"
                        type="text"
                        onChange={handleChange}
                        value={newConvoFormData.text}
                    />
                </fieldset>
                <button type='submit' className="new-convo-send-btn">Send</button>
            </form>
            <button className="new-convo-close-btn" onClick={onCloseDialogClick}>X</button>
        </dialog>
    </>
}

export default NewChatCreatorDialog