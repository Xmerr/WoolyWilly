import Canvas from './canvas';

require('./base.scss');

class Base extends React.Component{
    render() {
        return(
            <div className='MainArea'>
                <Canvas />
            </div>
        );
    }
}

export default Base;

ReactDOM.render(
    <Base />,
    document.getElementById('content')
);