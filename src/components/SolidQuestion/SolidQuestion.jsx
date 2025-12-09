import classNames from "classnames/bind";
import style from "./SolidQuestion.module.scss";

const cx = classNames.bind(style);

export const SolidQuestion = ({ img, index, title, options = [], selected, onSelect, answer, submitted }) => {

    return (
        <div className={cx("question")}>
            <div className={cx("header")}>
                <div>
                    <div className={cx("index")}>
                        <span>{index + 1}</span>
                    </div>
                    <h5 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h5>
                </div>

                {img && (
                    <div className={cx("image")}>
                        <img style={{width:250,objectFit:"cover"}} src={img} alt="" />
                    </div>
                )}
            </div>

            <div className={cx("options")}>
                {options.map((item, optionIndex) => {
                    let optionClass = "";
                    let symbol = "";

                    if (submitted) {
                        if (item.key === answer.answer) {
                            optionClass = cx("correct");
                            symbol = "✓";
                        } else if (selected === item.key && item.key !== answer.answer) {
                            optionClass = cx("wrong");
                            symbol = "✗";
                        }
                    }

                    return (
                        <div key={optionIndex} className={`${cx(symbol === "✓" ? "correct" : symbol === "✗" ? "inCorrect" : "option")} ${optionClass}`}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                checked={selected === item.key}  // check theo key
                                onChange={() => onSelect(item.key, index)} // gửi key và index
                                disabled={submitted}
                            />
                            <span style={{ fontWeight: 600, marginRight: 5 }}>{item.key}.</span>
                            {item.text} {symbol && <span style={{ marginLeft: 5, color: symbol === "✓" ? "" : "" }}>{symbol}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
