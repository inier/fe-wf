import '../assets/styles/footer.styl';

export default {
    data() {
        return {
            author: 'no one',
        };
    },
    render() {
        return (
            <div class="footer">
                <span>Written by {this.author}</span>
            </div>
        );
    },
};
