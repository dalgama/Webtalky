#! /bin/bash
tar -zcvf webtalky.tar.gz csi3140-project_don_olga.tar
cp csi3140-project_don_olga.tar /Users/AdrianAlgama/Sites/csi3140-project_don_olga.tar
tar -xvf /Users/AdrianAlgama/Sites/csi3140-project_don_olga.tar
mv /Users/AdrianAlgama/Sites/csi3140-project_don_olga/* /Users/AdrianAlgama/Sites/
rm -rf /Users/AdrianAlgama/Sites/csi3140-project_don_olga.tar
rm -rf /Users/AdrianAlgama/Sites/csi3140-project_don_olga
