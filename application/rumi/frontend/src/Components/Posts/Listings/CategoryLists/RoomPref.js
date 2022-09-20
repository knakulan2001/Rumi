import React, { Component } from "react";
import { FaSmoking } from "react-icons/fa";
import { RiParkingBoxLine } from "react-icons/ri";
import { MdOutlinePets } from "react-icons/md";

export default class RoomPref extends Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: false };
        this.parkingChecked = this.parkingChecked.bind(this);
        this.petChecked = this.petChecked.bind(this);
        this.smokingChecked = this.smokingChecked.bind(this);
    }

    parkingChecked() {
        this.setState({ parkingisChecked: !this.state.parkingisChecked });
    }

    petChecked() {
        this.setState({ petisChecked: !this.state.petisChecked });
    }

    smokingChecked() {
        this.setState({ smokingisChecked: !this.state.smokingisChecked });
    }

    style = { width: "25px", height: "25px", marginBottom: "-5px", marginRight: "8px" };

    render() {
        if (this.state.parkingisChecked) {
            this.props.parking(1);
        } else {
            this.props.parking("");
        }

        if (this.state.petisChecked) {
            this.props.pet(1);
        } else {
            this.props.pet("");
        }

        if (this.state.smokingisChecked) {
            this.props.smoking(1);
        } else {
            this.props.smoking("");
        }

        return (
            <div>
                <div>
                    <div className="filter-label">
                        <label>
                            <input type="checkbox" onChange={this.parkingChecked} />
                            <span>
                                <RiParkingBoxLine style={this.style} />
                                With Parking
                            </span>
                        </label>
                    </div>
                    <div className="filter-label">
                        <label>
                            <input type="checkbox" onChange={this.petChecked} />
                            <span>
                                <MdOutlinePets style={this.style} />
                                Pet Friendly
                            </span>
                        </label>
                    </div>
                    <div className="filter-label">
                        <label>
                            <input type="checkbox" onChange={this.smokingChecked} />
                            <span>
                                <FaSmoking style={this.style} />
                                Can Smoke
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
