import SmallButton from '../../components/Main/SmallButton.jsx';
import '../manageCamera/ManageCamera.scss'
const ManageCamera = () => {

    return (
        <div>
            <h1>Manage Camera</h1>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Camera Id</th>
                        <th>Location</th>
                        <th>Remove camera</th>
                    </tr>
                    </thead>
                </table>
                <SmallButton className="small_button_green" onClick={onclick}>
                    Add New Camera
                </SmallButton>
            </div>

        </div>
    );
};

export default ManageCamera;
