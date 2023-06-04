// CSS
import styles from './Calendar.module.css'

// Hooks
import { useState } from 'react'
import Clock from './Clock/Clock'

const Calendar = () => {
    const date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())
    const [dayOfWeek, setDaysOfWeek] = useState(date.getDay())
    const [day, setDay] = useState(date.getDate())

    // Todos os meses, quantidade de dias e em qual dia da semana cai o dia 1
    const months = [
        { name: 'Janeiro', days: 31, firstDayInWeek: 0 },
        { name: 'Fevereiro', days: 28, firstDayInWeek: 3 },
        { name: 'Março', days: 31, firstDayInWeek: 3 },
        { name: 'Abril', days: 30, firstDayInWeek: 6 },
        { name: 'Maio', days: 31, firstDayInWeek: 1 },
        { name: 'Junho', days: 30, firstDayInWeek: 4 },
        { name: 'Julho', days: 31, firstDayInWeek: 6 },
        { name: 'Agosto', days: 31, firstDayInWeek: 2 },
        { name: 'Setembro', days: 30, firstDayInWeek: 5 },
        { name: 'Outubro', days: 31, firstDayInWeek: 0 },
        { name: 'Novembro', days: 30, firstDayInWeek: 3 },
        { name: 'Dezembro', days: 31, firstDayInWeek: 5 }
    ]

    // Todos os dias da semana e suas abreviações
    const daysOfWeek = [
        { name: 'Domingo', littleName: 'Dom' },
        { name: 'Segunda-Feira', littleName: 'Seg' },
        { name: 'Terça-Feira', littleName: 'Ter' },
        { name: 'Quarta-Feira', littleName: 'Qua' },
        { name: 'Quinta-Feira', littleName: 'Qui' },
        { name: 'Sexta-Feira', littleName: 'Sex' },
        { name: 'Sábado', littleName: 'Sáb' }
    ]

    // Próxio mês
    const nextMonth = () => {
        setMonth(month + 1)

        if (month >= 11) {
            setMonth(0)
            // setYear(year + 1)
        }
    }

    // Mês anterior
    const backMonth = () => {
        setMonth(month - 1)

        if (month <= 0) {
            setMonth(0)
            // setYear(year - 1)
        }
    }

    // Se o ano for bissexto, fevereiro tem 29 dias
    const leapYear = () => {
        if (year % 4 === 0) {
            months[1].days = 29
        }
    }

    // Ler quantos dias tem no respectivo mês e colocar em um Array
    const printDays = () => {
        leapYear()
        const daysMonth = []
        for (let i = 1; i <= months[month].days; i++) {
            daysMonth.push(i)
        }
        return daysMonth
    }

    // Retirar o estilo do dia 
    const noStyle = month !== date.getMonth() || year !== date.getFullYear()

    // Coloca o dia 1 no dia da semana correspondente
    const previousMonth = () => {
        const daysOfPreviousMonth = []
        for (let i = 1; i <= months[month].firstDayInWeek; i++) {
            daysOfPreviousMonth.push(i)
        }
        return daysOfPreviousMonth
    }


    return (
        <div className={styles.calendar}>
            <header>
                <h1>{year}</h1>
                <h3>{months[month].name}</h3>
                <h4>{daysOfWeek[dayOfWeek].name}</h4>
                <hr />
                <div className={styles.arrows}>
                    <i className="bi bi-chevron-left" onClick={backMonth}></i>
                    <i className="bi bi-chevron-right" onClick={nextMonth}></i>
                </div>
            </header>
            <div className={styles.days_month}>
                {daysOfWeek.map((date) => <p>{date.littleName}</p>)}
            </div>
            <div className={styles.days_week}>

                {previousMonth().map(() => (
                    <p className={styles.other_month}></p>
                ))}

                {printDays().map((date_) => (
                    date_ === day ? (
                        noStyle ? (
                            <p>{date_}</p>
                        ) : (
                            <p className={styles.today}>{date_}</p>
                        )
                    ) : (
                        <p>{date_}</p>
                    )
                ))}
            </div>

            <div className={styles.clock}>
                <Clock />
            </div>
        </div>
    )
}

export default Calendar

// Não sei como posso fazer com os outros anos. Ficou preso só em 2023
// p*30{$} 