import './tabButton.component.css';

function TabButton(props: any) {
    return (
        <>
        <div className="container-tabs ">
            <button className="tab tab-left" onClick={props.viewAllPosts}>All</button>
            <button className="tab tab-right selected-tab" onClick={props.viewMyFavs}>My faves</button>
        </div>

        </>
    )
}


export default TabButton;