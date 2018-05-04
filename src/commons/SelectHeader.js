import React, { Component } from 'react';
import {
    TouchableOpacity, View, Text
} from 'react-native';
import { ActionSheet } from 'native-base';
import Icon from './Icon';
import styles from '../styles/styles';
import * as overviewAction from '../modules/overview/overviewAction';
import * as departmentAction from "../modules/department/departmentAction";
import * as classStartDateAction from "../modules/class-start-date/classStartDateAction";
import * as baseAction from "../modules/base/baseAction";
import { bindActionCreators } from "redux";
import { GEN, ALL_BASE, ALL_DEPARTMENT, ALL_PROVINCES, SUBJECT} from '../constants/text';
import { connect } from "react-redux";

let base_value = null;
let gen_value = null;
let department_value = null;
let typeTransferMoney = null;
let statusTransferMoney = null;
let provinces_value = null;
let subject_value = null;

export let returnSubjectValue = (value) => {
    value(subject_value)
}
export let returnProvincesValue = (value) => {
    value(provinces_value)
};
export let returnBaseValue = (value) => {
    value(base_value)
};
export let returnGenValue = (value) => {
    value(gen_value)
};
export let returnDepartmentValue = (value) => {
    value(department_value)
};
export let returnTypeTransferMoney = (value) => {
    value(type_value)
};
export let returnStatusTransferMoney = (value) => {
    value(status_value)
};

class SelectHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: [],
            baseState: null,
            genState: null,
            subjectState: null,
            departmentState: null,
            provincesState: null,
            typeTransferMoney: "Tìm theo loại",
            statusTransferMoney: "Tìm theo trạng thái"
        };
    }

    componentWillMount() {
        if (this.props.gen.length == 0) {
            this.props.overviewAction.getDataGen(this.props.token);
        }
        if (this.props.base.length == 0) {
            this.props.overviewAction.getDataBase(this.props.token);
        }
        if(this.props.departments.length == 0) {
            this.props.departmentAction.getAllDepartment(this.props.token);
        }
        if(this.props.provinces.length == 0) {
            this.props.baseAction.getAllProvinces(this.props.token);
        }
        if(this.props.courses.length == 0) {
            this.props.classStartDateAction.getAllSubject(this.props.token); 
        }
    }

    pickSubject() {
        let OPTIONS = this.props.courses;
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        //  reacconsole.log(OPTIONS);
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ subjectState: OPTIONS_NEW[buttonIndex] });
                    subject_value = OPTIONS[buttonIndex].id;
                    this.props.functionSubject()
                }
            }
        )
    }
    pickProvinces() {
        let OPTIONS = [{ id: "0", name: ALL_PROVINCES }, ...this.props.provinces];
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        //  reacconsole.log(OPTIONS);
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ provincesState: OPTIONS_NEW[buttonIndex] });
                    provinces_value = OPTIONS[buttonIndex].id;
                    this.props.functionProvinces()
                }
            }
        )
        //console.log(this.state.provincesState);
    }

    pickGen() {
        let OPTIONS_NEW = this.props.gen.map((item) => {
            return GEN + item.name
        });

        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleRight
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ genState: OPTIONS_NEW[buttonIndex] });
                    gen_value = this.props.gen[buttonIndex].id;
                    this.props.functionGen()
                }

            }
        )

    }
    pickBase() {
        let bases = this.props.base 
        let OPTIONS = this.props.haveBaseNotAll ?  bases.filter(item => item.id !== 0) : this.props.base;
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ baseState: OPTIONS_NEW[buttonIndex] });
                    base_value = OPTIONS[buttonIndex].id;
                    this.props.functionBase()
                }
            }
        )
    }
    pickDepartment() {
        let OPTIONS = [...this.props.departments, { id: "0", name: ALL_DEPARTMENT }]
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ departmentState: OPTIONS_NEW[buttonIndex] });
                    department_value = OPTIONS[buttonIndex].id;
                    this.props.functionDepartment()
                }
            }
        )
    }
    pickTypeTransferMoney() {
        let OPTIONS = [{ id: "0", name: "Tất cả" }, { id: "send", name: "Gửi" }, { id: "receive", name: "Nhận" }]
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ typeTransferMoney: OPTIONS_NEW[buttonIndex] });
                    type_value = OPTIONS[buttonIndex].id;
                    this.props.functionTypeTransferMoney()
                }
            }
        )
    }
    pickStatusTransferMoney() {
        let OPTIONS = [{ id: "", name: "Tất cả" }, { id: "0", name: "Đang giao dịch" }, { id: "1", name: "Thành Công" }, { id: "-1", name: "Huỷ" }]
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleRight
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ statusTransferMoney: OPTIONS_NEW[buttonIndex] });
                    status_value = OPTIONS[buttonIndex].id;
                    this.props.functionStatusTransferMoney()
                }
            }
        )
    }
    pickTypeExpenditure() {
        let OPTIONS = [{ id: "", name: "Tất cả" }, { id: 1, name: "Thu" }, { id: 2, name: "Chi" }]
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ typeTransferMoney: OPTIONS_NEW[buttonIndex] });
                    type_value = OPTIONS[buttonIndex].id;
                    this.props.functionTypeExpenditure()
                }
            }
        )
    }
    pickTypeTransactionStaff() {
        let OPTIONS = [{ id: "", name: "Tất cả" }, {id : 0, name : "Chuyển tiền"}, { id: 1, name: "Thu" }, { id: 2, name: "Chi" }]
        let OPTIONS_NEW = OPTIONS.map((item) => {
            return item.name
        });
        let OPTIONS_RENDER = [...OPTIONS_NEW, "Thoát"];
        let CANCEL_INDEX = OPTIONS_RENDER.length - 1;
        ActionSheet.show(
            {
                options: OPTIONS_RENDER,
                cancelButtonIndex: CANCEL_INDEX,
                title: this.props.selectTitleLeft
            },
            buttonIndex => {
                if (buttonIndex < OPTIONS_RENDER.length - 1) {
                    this.setState({ typeTransferMoney: OPTIONS_NEW[buttonIndex] });
                    type_value = OPTIONS[buttonIndex].id;
                    this.props.functionType()
                }
            }
        )
    }

    __renderGenData() {
        this.props.gen.filter((item) => {
            if (item.id = this.props.currentGen) return item.name;
        })
    }


    render() {
        const { haveTypeExpenditure, haveBase, haveGen, gen, base, haveSubject, courses, departments, haveDepartment,haveTypeTransactionStaff, haveTypeTransferMoney, haveStatusTransferMoney, haveProvinces, currentGen } = this.props;
        console.log(base)
        const { baseState, genState, departmentState, provincesState, subjectState } = this.state;
        return (
            <View style={[styles.wrapperRowCenterVertical, styles.paddingLeftRight, { marginBottom: 10 }]} >
                {
                    haveGen && gen.length > 0
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickGen()}
                        >
                            <Text style={styles.textDescriptionDark}>{genState == null
                                ?
                                GEN +
                                gen.filter((item) => {
                                    if (item.id == currentGen) {
                                        return item.name
                                    }
                                }).map((item) => {
                                    return item.name
                                })
                                :
                                genState}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    haveSubject && courses.length > 0
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickSubject()}
                        >
                            <Text style={styles.textDescriptionDark}>{subjectState == null
                                ?
                                SUBJECT +
                                courses.filter((item) => {
                                    if (item.id == courses.id) {
                                        return item.name
                                    }
                                }).map((item) => {
                                    return item.name
                                })
                                :
                                subjectState}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    haveBase && base.length > 0
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickBase()}
                        >
                            <Text style={styles.textDescriptionDark}>{baseState == null ? (this.props.haveBaseNotAll ? this.props.base[1].name : ALL_BASE) : baseState}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity >
                        :
                        null
                }
                {
                    haveDepartment && departments.length > 0
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickDepartment()}
                        >
                            <Text style={styles.textDescriptionDark}>{departmentState == null ? ALL_DEPARTMENT : departmentState}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    haveTypeTransferMoney
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickTypeTransferMoney()}
                        >
                            <Text style={styles.textDescriptionDark}>{this.state.typeTransferMoney}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    haveStatusTransferMoney
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickStatusTransferMoney()}
                        >
                            <Text style={styles.textDescriptionDark}>{this.state.statusTransferMoney}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    haveProvinces
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickProvinces()}
                        >
                            <Text style={styles.textDescriptionDark}>{provincesState == null ? ALL_PROVINCES : provincesState}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity >
                        :
                        null
                }
                 {
                    haveTypeExpenditure
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickTypeExpenditure()}
                        >
                            <Text style={styles.textDescriptionDark}>{this.state.typeTransferMoney}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }
                {
                    haveTypeTransactionStaff
                        ?
                        <TouchableOpacity
                            style={[styles.wrapperRowCenterVertical, { marginRight: 20 }]}
                            onPress={() => this.pickTypeTransactionStaff()}
                        >
                            <Text style={styles.textDescriptionDark}>{this.state.typeTransferMoney}</Text>
                            <Icon name={"Entypo|triangle-down"} size={15} />
                        </TouchableOpacity>
                        :
                        null
                }

            </View >
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoadingGen: state.overview.isLoadingGen,
        isLoadingBase: state.overview.isLoadingBase,
        isLoadingProvinces: state.base.isLoadingProvinces,
        base: state.overview.base,
        gen: state.overview.gen,
        courses: state.classStartDate.courses,
        currentGen: state.overview.currentGen,
        provinces: state.base.provinces,
        departments: state.department.departments,
        token: (state.login.token === null) ? state.register.token : state.login.token,
        // base_now: state.class_room.base_now,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        overviewAction: bindActionCreators(overviewAction, dispatch),
        departmentAction: bindActionCreators(departmentAction, dispatch),
        baseAction: bindActionCreators(baseAction, dispatch),
        classStartDateAction: bindActionCreators(classStartDateAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectHeader)
