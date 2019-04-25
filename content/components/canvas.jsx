import willy from '_images/Willy.png';

/**
 * Creates a single blob of hair to be used on willy
 */
class Shavings {
    constructor(key) {
        this.key = key;
        this.x = 0;
        this.y = 0;
    }

    xy(xy) {
        this.x = xy.x; 
        this.y = xy.y;
    }

    render () {
        return (
            <g key={this.key}
                data-key={this.key}
                transform={`translate(${this.x}, ${this.y})`}
            >
                <circle 
                    x={50} 
                    y={50} 
                    r="5" fill="gray" />
            </g>
        );
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shavings: [],
            selected: null
        };
    }

    startDrag(e) {
        this.setState({selected: e.target.parentElement.dataset.key});
    }

    drag(e) {
        if(!this.state.selected)
            return;

        e.preventDefault();

        var ctm = this.refs.canvas.getScreenCTM();
        var xy = {
            x: (e.clientX - ctm.e) / ctm.a, 
            y: (e.clientY - ctm.f) / ctm.a
        };

        this.setState(pState => {
            pState.shavings[pState.selected]
                .xy(xy);

            return {
                shavings: [...pState.shavings]
            };
        });
    }

    endDrag(e){
        if(!this.state.selected)
            return;

        this.setState({selected: null})
    }

    newShaving() {
        var key = this.state.shavings.length;
        return {
            constructor: () => {
                this.x = 0; 
                this.y = 0;

                this.key = key;
            },

            xy: xy => {
                this.x = xy.x; 
                this.y = xy.y;
            },

            render: () =>
                <g key={this.key}
                    data-key={this.key}
                    transform={`translate(${this.x}, ${this.y})`}
                >
                    <path d="M10 10, L 14 14" stroke="black"/>
                    <circle x="10" y="10" r="10" stroke="black" />
                </g>
        }
    }

    addShaings(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState(pState => ({
            shavings: [...pState.shavings, new Shavings(pState.shavings.length)]
        }));

        return false;
    }

    render() {
        return (
            <svg className='Canvas'
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid meet"
                ref="canvas"
                onContextMenu={ e => this.addShaings(e)}
                onMouseDown={e => this.startDrag(e)}
                onMouseMove={e => this.drag(e)}
                onMouseUp={e => this.endDrag(e)}
            >
                <text
                    x={325}
                    y={50}
                    transform="translate(-50%, 0)"
                >
                    Right Click to Spawn Hairball
                </text>
                <image href={willy}
                    width="700"
                    height="700"
                    x={500 - 700 / 2}
                    y={500 - 700 / 2}
                />

                {this.state.shavings.map(s => {
                    return s.render();
                })}
            </svg>
        )
    }
};

Canvas.propTypes={
};

export default Canvas;