import "babel-polyfill";
import formatter from "../src/formatter";

describe("formatter", function() {
    beforeEach(function() {
        this.n1qlFormatter = {
            format: (query) => query + " (formatted as N1QL)"
        };
        this.standardSqlFormatter = {
            format: (query) => query + " (formatted as standard SQL)"
        };

        formatter.__set__({
            n1qlFormatter: this.n1qlFormatter,
            standardSqlFormatter: this.standardSqlFormatter
        });
    });

    it("formats N1QL query", function() {
        const result = formatter.format("n1ql", "SELECT *");

        expect(result).toBe("SELECT * (formatted as N1QL)");
    });

    it("formats standard SQL query", function() {
        const result = formatter.format("sql", "SELECT *");

        expect(result).toBe("SELECT * (formatted as standard SQL)");
    });

    it("throws error on other language queries", function() {
        expect(() => formatter.format("hql", "SELECT *")).toThrow("Unsupported language");
    });
});
