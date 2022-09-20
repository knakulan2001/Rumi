import React, { Component } from "react";
import Select from "react-select";

const options = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Non-binary", value: "N" },
    { label: "No Preference", value: "" },
];
export default class Gender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [],
        };
    }
    componentDidMount() {
        this.setState({ selectOptions: options });
    }

    handleChange(e) {
        this.setState({ id: e.value });
        this.props.gender(e.value);
    }

    render() {
        return (
            <div>
                <Select
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    value={this.state.value}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: "#1eb4a53b",
                            primary: "#1da699",
                        },
                    })}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            width: 300,
                            height: 60,
                            border: "2px solid #0000002c",
                            borderColor: "#1da699",
                            cursor: "pointer",
                            boxShadow: "5px 5px 24px 5px rgba(0, 0, 0, 0.06)",
                            "&:hover": {
                                borderColor: "#1da699",
                            },
                        }),
                        menu: (provided, state) => ({
                            ...provided,
                            border: "2px solid #0000002c",
                            boxShadow: "none",
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            padding: 20,
                            cursor: "pointer",
                        }),
                    }}
                />
            </div>
        );
    }
}
