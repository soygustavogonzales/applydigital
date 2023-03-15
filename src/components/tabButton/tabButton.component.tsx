import './tabButton.component.css';

function TabButton() {
    return (
        <>
        <div className="container-tabs ">
            <button className="tab tab-left">All</button>
            <button className="tab tab-right selected-tab">My faves</button>
        </div>

        </>
    )
}


export default TabButton;