import '@src/assets/styles/footer.styl';

export default {
    data() {
        return {
            author: 'kk',
        };
    },
    render() {
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        );
    },
};
