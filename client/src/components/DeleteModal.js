const DeleteModal = ({ deleteId, deleteFunction, message }) => {
    return (
        <div className="commentModal">
            <p>{message}</p>
            <button type="button" onClick={() => deleteFunction(deleteId, false)}>Cancel</button>
            <button onClick={() => deleteFunction(deleteId, true)}>Delete</button>
        </div>
    )
}

export default DeleteModal