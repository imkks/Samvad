import PropTypes from 'prop-types'

const Messages = ({isMyMessage,content,sender}) => {
    return (
        <div className={`${isMyMessage?'align-self-end':''} bg-primary text-light p-2 rounded my-2 w-75`}>
        {content}
        <div className="bg-info w-auto rounded">{isMyMessage?'you':sender}</div>

    </div>
    )
}
 


export default Messages
