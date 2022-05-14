import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import DropdownButton from "../../components/DropdownButton";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { apiUrl } from "../../config";

export const ExistingProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [expiryDate, setExpiryDate] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    console.log(name.length);
    if (name.length > 90) {
      setErrors({
        ...errors,
        name: "Date should be in the future",
      });
    } else {
      setErrors({
        ...errors,
        name: false,
      });
    }
  }, [name]);

  useEffect(() => {
    // Fetching all categories
    fetch(apiUrl + "/categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Set new categories
          setCategories(res.data);
        }
      });

    /**
     * The second parameter (empty array) ensures that the useEffect calls
     * the function only once - when the page first mounts
     */
  }, []);

  useEffect(() => {
    // Fail quick
    if (!selectedCategory) {
      return;
    }

    // Fetch all category's subcategories
    fetch(apiUrl + "/categories/subcategories?categoryName=" + selectedCategory)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Reset selected subcategory
          setSelectedSubCategory("");

          // Set new subcategories
          setSubCategories(res.data);
        }
      });

    /**
     * The second parameter (selectedCategory) ensures that the useEffect calls
     * the function only when selectedCategory changes
     */
  }, [selectedCategory]);

  // Controller
  const handleSubmit = () => {
    console.log(expiryDate, name);
    // Fail quick
    if (!(expiryDate && name && selectedSubCategory)) {
      return;
    }

    // If the selected expiry date is in the past, fail the form submission
    if (new Date(expiryDate) < new Date()) {
      return;
    }

    // Generate the body necessary for BE
    const body = {
      name,
      subCategoryName: selectedSubCategory,
      note: note || undefined,
      expiryDate: new Date(expiryDate).toISOString(),
    };

    // Post the product
    fetch(apiUrl + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // If BE inserted the product, reset the form
        if (res.success) {
          setName("");
          setNote("");
          setSelectedSubCategory("");
          setExpiryDate("");
        }

        if (!res?.success && res?.errorCode === 2) {
          console.log("PRODUCT ALREADY EXISTS");
        } else {
          console.error("Something went wrong");
        }
      });
  };

  return (
    <>
      <h2 className="title">Add product</h2>

      <label>Search:*</label>
      <Input
        className={errors["name"] ? " error" : ""}
        value={name}
        onChange={setName}
        placeholder="Type product name..."
      />

      <DropdownButton
        placeholder="Select Category"
        value={selectedCategory}
        onChange={setSelectedCategory}
        data={categories.map((c) => ({
          value: c.name,
          label: c.name,
        }))}
      />

      <DropdownButton
        placeholder="Select Subcategory"
        value={selectedSubCategory}
        onChange={setSelectedSubCategory}
        data={subCategories.map((c) => ({
          value: c.name,
          label: c.name,
        }))}
      />

      <Input value={expiryDate} onChange={setExpiryDate} type="date" />

      <TextArea value={note} onChange={setNote} placeholder="Type notes..." />

      <Button onClick={handleSubmit}>Add</Button>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        commodo odio et sem scelerisque, vel rutrum nibh vestibulum. Quisque vel
        iaculis lacus. Vivamus ultricies erat vel enim sagittis lobortis. Proin
        in auctor tortor. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Cras ornare, lectus sit amet aliquam varius, leo lacus
        ultrices nunc, ac pulvinar erat ipsum in ipsum. Suspendisse eu risus vel
        ex vestibulum euismod at ultricies felis. Nulla condimentum hendrerit
        convallis. Morbi nibh nulla, faucibus vitae suscipit sit amet, tempus ac
        quam. Praesent congue nulla elit, non fermentum dolor scelerisque
        lobortis. Nunc et porttitor sem. Integer tortor nibh, luctus a nibh
        vitae, ullamcorper efficitur purus. Mauris tristique accumsan vulputate.
        Mauris bibendum sem odio, ut tempus arcu fringilla vitae. Donec
        scelerisque, metus ultricies molestie accumsan, ante lectus dignissim
        lacus, vel vulputate lectus massa at dui. Nulla eu erat fringilla arcu
        congue tempor. Fusce posuere molestie fringilla. Proin blandit sapien
        diam, eget venenatis nibh sagittis quis. Nulla facilisi. Praesent nisi
        quam, interdum vel sapien a, lobortis sagittis justo. Proin sed augue
        mattis, convallis magna in, tincidunt est. Sed porta metus sed efficitur
        consectetur. Cras libero justo, aliquet at ipsum vel, convallis maximus
        urna. Suspendisse non dignissim lacus. Suspendisse et ornare sem. Nulla
        mi quam, posuere vitae auctor et, auctor sed diam. Cras placerat cursus
        aliquam. Suspendisse sed ipsum dapibus, molestie purus vel, condimentum
        mauris. Sed at sapien vitae magna malesuada blandit in a tellus. Fusce
        quis hendrerit libero. Pellentesque vehicula vehicula lacus nec
        ullamcorper. Curabitur sed nisi magna. Quisque rhoncus et ipsum at
        semper. Donec augue libero, finibus id ante at, lacinia tempus diam.
        Quisque scelerisque fermentum metus quis tincidunt. Vestibulum gravida
        elit ornare mauris venenatis, eget luctus nunc varius. Fusce semper
        placerat odio in sodales. Sed laoreet est tellus, eleifend dictum sem
        lacinia ullamcorper. Donec et sem eget lacus varius auctor posuere sed
        risus. Etiam quis eros fermentum, pellentesque augue molestie, placerat
        velit. Quisque dignissim odio malesuada eros tempus suscipit. Praesent
        quis blandit nunc, vel tincidunt odio. Nunc non tempus arcu, efficitur
        tincidunt orci. Aliquam imperdiet nunc quis congue rhoncus. Duis nec
        convallis justo, ultricies dictum ex. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Vivamus eleifend
        nibh vel pulvinar euismod. Duis blandit, mi at eleifend scelerisque, sem
        justo fermentum nibh, convallis aliquet metus magna non magna. Donec at
        nisl eleifend, aliquet neque ut, ultrices massa. Nullam ut orci commodo,
        dignissim ipsum et, consequat lacus. Sed quis eros dignissim, sodales
        mauris eu, rutrum diam. Nulla ultrices nulla et lobortis mollis.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Quisque scelerisque pulvinar arcu, id tempus
        mauris ultrices id. Donec malesuada mauris in tincidunt porta. Curabitur
        ullamcorper consequat risus, at auctor magna facilisis eget. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
        curae; Aenean ante orci, elementum eget dictum in, condimentum at ex.
        Maecenas vulputate nibh sit amet sapien molestie, a gravida arcu porta.
        Aenean et tortor in sem vehicula vehicula. Ut porttitor lacus sodales
        lorem maximus, a eleifend eros tincidunt. Nam ipsum ligula, gravida id
        nisi non, tristique accumsan ex. Etiam condimentum, turpis eu vestibulum
        congue, tortor mi accumsan diam, quis porta elit ante ac dui. Quisque
        auctor nec arcu et consectetur. Nam sed convallis sapien. Maecenas id
        sem ipsum. Praesent sagittis urna urna, vitae pretium ante suscipit sed.
        Sed posuere, odio efficitur dictum tincidunt, lorem neque aliquam ipsum,
        id porta sapien sem a arcu. Sed sed augue efficitur, posuere odio sed,
        condimentum tellus. Nunc consequat arcu vitae augue luctus, eu varius
        ipsum lobortis. Fusce faucibus at purus ac vehicula. Quisque at metus
        ultrices, dapibus felis a, gravida nisi. Maecenas nec porta augue.
        Aliquam ut suscipit justo. Fusce arcu erat, ultricies ac erat eget,
        tempor pulvinar neque. Ut convallis rutrum lobortis. Cras pellentesque
        nisl nisi, eu venenatis arcu rutrum in. Nulla cursus quam sed orci
        tempor, ac accumsan justo venenatis. Sed aliquam elit vel iaculis
        tempus. Nullam in ullamcorper arcu. Praesent justo eros, cursus sit amet
        malesuada aliquam, pulvinar ac magna. Aenean egestas imperdiet sapien,
        vel fermentum purus efficitur sit amet. Pellentesque mattis sapien nisi,
        id pretium mi pharetra et. Nullam vel est nisl. Vestibulum bibendum orci
        vel imperdiet rutrum. Maecenas sodales cursus sem, in ullamcorper ante
        pulvinar ac. Nulla pharetra, nulla ut dignissim lobortis, neque ex
        molestie arcu, ac viverra ipsum eros at elit. Cras sit amet mi odio.
        Phasellus nunc neque, ultricies vel turpis in, sollicitudin viverra
        sapien. Vestibulum posuere hendrerit sodales. Pellentesque eget turpis
        elit. Fusce libero metus, sodales sed gravida non, facilisis id diam.
        Morbi et ante in ligula mollis facilisis. Praesent suscipit enim eros,
        in ultricies lectus laoreet viverra. Quisque mollis tellus vitae libero
        facilisis imperdiet. Integer faucibus ipsum non imperdiet lobortis. Duis
        sed volutpat tellus, ac laoreet sapien. Sed sed ipsum et dui pretium
        pulvinar ac condimentum erat. Vivamus tristique lacus sit amet est
        mollis varius. Donec vel suscipit lorem. Sed imperdiet eros eget neque
        dapibus, a facilisis mauris bibendum. Aliquam aliquam ut nibh vitae
        posuere. In congue urna a sem efficitur iaculis. Etiam sagittis est
        sapien, venenatis finibus diam efficitur nec. Suspendisse gravida velit
        a nibh consequat, sit amet rhoncus massa fringilla. Mauris congue ac
        elit eu molestie. Vivamus aliquet ultrices sem, a porttitor orci
        ultrices ut. Pellentesque lorem nisl, aliquam nec eleifend sit amet,
        vestibulum ut ex. Suspendisse ut porta erat. Suspendisse pellentesque
        auctor tortor, nec dapibus enim rhoncus a. Vestibulum vel neque eu nulla
        dictum tincidunt. Cras eleifend vel nunc eget pulvinar. Nunc tortor mi,
        accumsan consectetur ex nec, fringilla imperdiet magna. Nunc lacinia
        tellus a elit volutpat, posuere condimentum libero pellentesque.
        Pellentesque varius tincidunt varius. Duis id vestibulum ipsum. Nullam
        facilisis sapien fermentum consequat hendrerit. Nulla eget lectus nec
        tellus malesuada vehicula non vitae nisl. Morbi ultrices sagittis lacus
        nec tristique. Donec nec nisl neque. Sed vitae tristique tellus, cursus
        faucibus neque. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Aenean condimentum leo nulla, a
        fermentum eros semper eget. Donec eget nisi placerat, laoreet ipsum a,
        ultrices dolor. Duis sed condimentum odio, in bibendum nisi. Fusce a
        dictum massa. Sed luctus congue libero, non laoreet leo accumsan in.
        Integer auctor vulputate convallis. Morbi facilisis orci nec vulputate
        pulvinar. Donec elementum arcu id sollicitudin cursus. Donec cursus,
        nisi vehicula laoreet ultrices, ex ipsum interdum est, ac commodo libero
        est et erat. Proin pulvinar congue orci sed placerat. Integer aliquam
        magna ac turpis fringilla, ac dictum dui varius. Etiam ultrices quis
        nisl in placerat. Nullam in metus viverra, laoreet sapien a, molestie
        enim. Nunc vitae ex id leo aliquam tincidunt nec vitae ex. Integer ut
        dui malesuada, bibendum augue id, venenatis orci. Duis nec ligula
        pharetra, elementum magna et, vestibulum augue. Sed ac dolor eleifend
        tortor sollicitudin tristique. Fusce consectetur ut quam vitae tempor.
        Nulla blandit mi non massa convallis, ut tincidunt velit rutrum. Proin
        iaculis, est non hendrerit rhoncus, nisi est posuere neque, a malesuada
        erat justo non lorem. Suspendisse ut diam nunc. Ut iaculis mollis turpis
        eu scelerisque. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. In at lacus ullamcorper, auctor
        ipsum id, ullamcorper nunc. In hac habitasse platea dictumst. Morbi in
        euismod erat. Duis quam dui, congue et vestibulum ut, lobortis vitae
        nisi. Etiam dignissim diam ac ligula feugiat, ut malesuada neque tempus.
        Nam ac mattis lectus. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Cras malesuada risus quis
        justo varius, ac scelerisque nisl pellentesque. Nunc cursus convallis
        augue, in tempor arcu lobortis vitae. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
        Suspendisse sagittis odio nibh, vel fermentum lectus rutrum sit amet.
        Sed semper leo sollicitudin pellentesque auctor. Praesent sit amet
        tincidunt enim, id blandit nulla. Vestibulum quis viverra lorem. Duis
        commodo nunc erat, vel volutpat sem consectetur placerat. Fusce mi
        purus, gravida nec elit ut, aliquet consectetur mi. Curabitur ut
        interdum purus. Donec ex dolor, tincidunt et auctor et, volutpat non
        odio. Duis sagittis aliquam nisi eleifend ultrices. Vivamus dignissim
        magna et accumsan facilisis. Fusce ultrices congue risus, eu sodales
        tortor pulvinar eget. In tempor quam id ligula faucibus, in eleifend
        velit tristique. Suspendisse faucibus sollicitudin metus vitae
        consequat. Etiam nec lorem ac lorem porta auctor. Vestibulum tincidunt
        volutpat nisi ac tempus. Pellentesque volutpat sed elit sit amet
        fermentum. Nunc a turpis placerat, volutpat lorem a, porttitor diam.
        Nullam ultrices vitae nunc faucibus efficitur. Duis eleifend egestas
        dolor sit amet pulvinar. Etiam consectetur sem purus, sed viverra velit
        mollis id. Curabitur laoreet vitae mi vel mattis. Morbi semper pretium
        massa. Proin egestas nibh vitae facilisis vestibulum. Donec volutpat
        nisl dui, et rhoncus ligula aliquam sed. Proin at laoreet enim.
        Pellentesque vel pharetra elit. Nam euismod erat diam, id rutrum dolor
        convallis iaculis. Integer maximus condimentum ante a efficitur. Quisque
        finibus augue sed lacus imperdiet sodales. Suspendisse sit amet magna
        mattis diam imperdiet auctor. Nullam ac ipsum sodales, condimentum risus
        nec, viverra quam. Nam et laoreet felis. Aenean aliquam nunc neque, eget
        semper quam mattis ac. Duis vel libero augue. Donec molestie ac nunc ut
        viverra. Sed commodo nibh dui, sed varius lectus feugiat vel. Nam eu
        felis mi. Donec justo odio, volutpat et tortor at, vestibulum rhoncus
        enim. Nam mollis feugiat odio quis tincidunt. Donec laoreet cursus
        suscipit. Etiam auctor consectetur purus, at lobortis sem pellentesque
        nec. Mauris ut magna at ante egestas pulvinar. Aliquam posuere urna eu
        bibendum lobortis. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Aliquam leo lectus, viverra nec dapibus vitae, luctus vitae
        arcu. Nulla facilisi. Nullam ornare faucibus purus, non vehicula elit
        consectetur quis. Nunc elementum, urna vel mattis egestas, orci enim
        luctus lectus, at rutrum ipsum dolor non elit. In in cursus nisi.
        Suspendisse non eleifend metus. Curabitur convallis dignissim ante, a
        cursus nisi condimentum et. Donec placerat placerat dui ut auctor. Sed
        mollis pulvinar odio, vel vehicula orci tempor eget. Donec ultricies,
        enim quis tempus lacinia, augue ligula pellentesque augue, ac
        consectetur ipsum eros eget dolor. Integer at justo faucibus, gravida
        neque et, aliquam enim. Quisque nec enim leo. Phasellus congue fringilla
        sem, vitae eleifend quam mollis eu. Nam nec mollis quam, at posuere
        nibh. Fusce sed sem porta, suscipit risus vitae, ultrices neque. Donec
        varius iaculis justo a elementum. Nam nibh erat, feugiat in bibendum sit
        amet, lobortis nec urna. Pellentesque habitant morbi tristique senectus
        et netus et malesuada fames ac turpis egestas. Mauris eu maximus mi.
        Donec porttitor, turpis aliquet molestie vestibulum, dolor orci
        elementum lorem, ut placerat dui orci non diam. Fusce aliquam, mauris eu
        tempor tempus, turpis orci suscipit ipsum, vitae cursus massa diam ut
        augue. Phasellus sodales lorem dictum lectus viverra eleifend. Morbi
        varius turpis orci, id commodo ex iaculis dignissim. Cras sit amet nunc
        justo. Maecenas lacus nulla, consectetur varius quam in, dapibus viverra
        ligula. Sed dignissim arcu ipsum, eu consequat tortor volutpat vel.
      </div>
    </>
  );
};
