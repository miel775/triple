function search(source, name) {
    var results

    name = name.toUppercase()
    results = $.map(source, function(entry { 
        var match = entry.name.toUpperCase().indexOf(name) !== -1;
        return match ? entry : null;
    });
    return results;
}