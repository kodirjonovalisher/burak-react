import { Component } from "react";

interface TestState {
    brand: string;
    model: string;
    color: string;
    year: number;
}

class Test extends Component<Record<string, never>, TestState> {
    state: TestState = {
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964,
    };

    changeDetail = () => {
        this.setState({ color: "red", brand: "BYD", model: "T", year: 2026 });
    };

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (
            <div>
                <h1>My {this.state.brand}</h1>
                <p>
                    Color:{this.state.color}-Model:{this.state.model} from {this.state.year}.
                </p>
                <button type="button" onClick={this.changeDetail}>Change Detail</button>
            </div>
        );
    }
}

export default Test;
