import React, {Component} from 'react';
import {View, Animated, TextInput, StyleSheet} from 'react-native';
import {colors} from '../../Constants';

class AppFloatingInput extends Component {
    state = {
        isFocused: false,
    };

    _animatedIsFocused = new Animated.Value(0);

    static getDerivedStateFromProps(props, state) {
        if (!state.isFocused) {
            return {isFocused: true}; // for case, when input not editable
        }
        return null;
    }

    componentDidMount() {
        this.animateInputIfNeeded();
    }

    componentDidUpdate() {
        this.animateInputIfNeeded();
    }

    animateInputIfNeeded() {
        Animated.timing(this._animatedIsFocused, {
            toValue: this.state.isFocused ? 1 : 0,
            duration: 200,
        }).start();
    }

    handleFocus = () => this.setState({ isFocused: true });

    handleBlur = () => {
        const {
            value,
            onBlur,
        } = this.props;

        // eslint-disable-next-line no-unused-expressions
        onBlur && onBlur();
        this.setState({ isFocused: value.length > 0 });
    };

    render() {
        const {
            reference,
            label,
            isRounded,
            isError,
            style,
            multiline,
        } = this.props;

        const containerStyle = {
            ...styles.container,
            height: multiline ? 166 : 52,
            borderRadius: isRounded ? 10 : 0,
            borderColor: isError ? colors.danger : 'transparent',
            ...style,
        };

        const labelStyle = {
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 11],
            }),
            color: this.state.isFocused ? colors.light_03 : colors.brownGrey,
        };

        const labelBlockStyle = {
            ...styles.placeholderContainer,
            height: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [41, 18],
            }),
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 9],
            }),
        };

        const baseInputContainerStyle = multiline ? 150 : 41;

        const inputBlockStyle = {
            ...styles.inputContainer,
            height: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [baseInputContainerStyle, baseInputContainerStyle - 4],
            }),
        };

        const inputStyle = {
            ...styles.input,
            ...(multiline ? {
                textAlignVertical: 'top',
                marginTop: 3,
            } : {}),
        };

        return (
            <View style={containerStyle}>
                <Animated.View style={labelBlockStyle}>
                    <Animated.Text style={[styles.label, labelStyle]}>
                        {label}
                    </Animated.Text>
                </Animated.View>

                <Animated.View style={inputBlockStyle}>
                    <TextInput
                        {...this.props}
                        ref={reference}
                        style={inputStyle}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        blurOnSubmit={true}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 52,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.light,
        borderWidth: 3,
    },
    placeholderContainer: {
        justifyContent: 'center',
        position: 'absolute',
        paddingHorizontal: 16,
        margin: -3,
    },
    label: {
        left: 0,
        color: colors.charcoalGrey,
        opacity: 0.4,
    },
    inputContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        margin: -3,
    },
    input: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        color: colors.charcoalGrey,
        paddingVertical: 0,
        paddingHorizontal: 16,
    },
});

export default AppFloatingInput;
